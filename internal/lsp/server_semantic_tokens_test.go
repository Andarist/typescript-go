package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func initSemanticTokensClient(t *testing.T, files map[string]string) *lsptestutil.LSPClient {
	t.Helper()

	fs := bundled.WrapFS(vfstest.FromMap(files, false))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability, lsproto.MethodWindowWorkDoneProgressCreate:
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		default:
			return nil
		}
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/home/projects",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				SemanticTokens: &lsproto.SemanticTokensClientCapabilities{
					Requests: &lsproto.ClientSemanticTokensRequestOptions{
						Full: &lsproto.BooleanOrClientSemanticTokensRequestFullDelta{Boolean: new(true)},
					},
					TokenTypes: []string{
						string(lsproto.SemanticTokenTypeNamespace),
						string(lsproto.SemanticTokenTypeClass),
						string(lsproto.SemanticTokenTypeEnum),
						string(lsproto.SemanticTokenTypeInterface),
						string(lsproto.SemanticTokenTypeStruct),
						string(lsproto.SemanticTokenTypeTypeParameter),
						string(lsproto.SemanticTokenTypeType),
						string(lsproto.SemanticTokenTypeParameter),
						string(lsproto.SemanticTokenTypeVariable),
						string(lsproto.SemanticTokenTypeProperty),
						string(lsproto.SemanticTokenTypeEnumMember),
						string(lsproto.SemanticTokenTypeDecorator),
						string(lsproto.SemanticTokenTypeEvent),
						string(lsproto.SemanticTokenTypeFunction),
						string(lsproto.SemanticTokenTypeMethod),
						string(lsproto.SemanticTokenTypeMacro),
						string(lsproto.SemanticTokenTypeLabel),
						string(lsproto.SemanticTokenTypeComment),
						string(lsproto.SemanticTokenTypeString),
						string(lsproto.SemanticTokenTypeKeyword),
						string(lsproto.SemanticTokenTypeNumber),
						string(lsproto.SemanticTokenTypeRegexp),
						string(lsproto.SemanticTokenTypeOperator),
					},
					TokenModifiers: []string{
						string(lsproto.SemanticTokenModifierDeclaration),
						string(lsproto.SemanticTokenModifierDefinition),
						string(lsproto.SemanticTokenModifierReadonly),
						string(lsproto.SemanticTokenModifierStatic),
						string(lsproto.SemanticTokenModifierDeprecated),
						string(lsproto.SemanticTokenModifierAbstract),
						string(lsproto.SemanticTokenModifierAsync),
						string(lsproto.SemanticTokenModifierModification),
						string(lsproto.SemanticTokenModifierDocumentation),
						string(lsproto.SemanticTokenModifierDefaultLibrary),
						"local",
					},
					Formats: []lsproto.TokenFormat{lsproto.TokenFormatRelative},
				},
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	return client
}

func TestSemanticTokensBOM1(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const source = "\ufefffunction f({\n" +
		"  x\n" +
		"}){}\n"

	client := initSemanticTokensClient(t, map[string]string{
		"/home/projects/a.ts": source,
	})

	uri := lsconv.FileNameToDocumentURI("/home/projects/a.ts")

	// Prime the inferred project before opening the file so the test exercises
	// the path where the open-file overlay text and the inferred-project parse
	// state are established from different server inputs.
	msg, _, ok := lsptestutil.SendRequest(t, client, lsproto.CustomProjectInfoInfo, &lsproto.ProjectInfoParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil, "expected project info response")

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        uri,
			LanguageId: "typescript",
			Version:    1,
			Text:       source,
		},
	})

	// Wait for the didOpen to be processed before checking state or requesting semantic tokens.
	msg, _, ok = lsptestutil.SendRequest(t, client, lsproto.CustomProjectInfoInfo, &lsproto.ProjectInfoParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil, "expected post-open project info response")

	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentSemanticTokensFullInfo, &lsproto.SemanticTokensParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok, "expected semantic tokens response")
	assert.Assert(t, msg != nil, "expected semantic tokens response")
	assert.Assert(t, msg.AsResponse().Error == nil, "expected semantic tokens request to succeed")
	assert.Assert(t, resp.SemanticTokens != nil, "expected semantic tokens payload")
	assert.Assert(t, len(resp.SemanticTokens.Data) > 0, "expected semantic token data")
	assert.Equal(t, len(resp.SemanticTokens.Data)%5, 0, "expected semantic token data to be encoded in 5-word entries")
}
