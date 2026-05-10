// @strict: true
// @noImplicitReferences: true
// @moduleResolution: bundler

// Reduced from a pnpm global virtual store layout:
// when a declaration package is reached through a symlink and then realpathed
// outside the consuming project's node_modules, imports of React helper types
// from that .d.ts file stop resolving correctly in TS 6.

// @filename: /cache/symlinked-react-helpers/package.json
{ "name": "symlinked-react-helpers", "version": "1.0.0", "types": "index.d.ts" }

// @filename: /cache/symlinked-react-helpers/index.d.ts
import type { ComponentProps, ComponentType } from "react";

export type StoryLike<T> =
  T extends ComponentType<any>
    ? { args?: Partial<ComponentProps<T>> }
    : { args?: T };

// @filename: /project/node_modules/@types/react/package.json
{ "name": "@types/react", "version": "1.0.0", "types": "index.d.ts" }

// @filename: /project/node_modules/@types/react/index.d.ts
declare module "react" {
  export type ReactNode = {};
  export type ComponentType<P = {}> = (props: P) => ReactNode;
  export type ComponentProps<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;
}

// @link: /cache/symlinked-react-helpers -> /project/node_modules/symlinked-react-helpers

// @filename: /project/repro.ts
import type { StoryLike } from "symlinked-react-helpers";
import type { ReactNode } from "react";

interface LabelProps {
  id: string;
  children: ReactNode;
}

interface WidgetProps {
  metric: number;
  label?: (props: LabelProps) => ReactNode;
}

declare function Widget(props: WidgetProps): ReactNode;

type Story = StoryLike<typeof Widget>;

export const CustomLabel: Story = {
  args: {
    metric: 50,
    label: ({ id, children }) => children,
  },
};
