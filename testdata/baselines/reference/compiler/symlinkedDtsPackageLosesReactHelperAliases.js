//// [tests/cases/compiler/symlinkedDtsPackageLosesReactHelperAliases.ts] ////

//// [package.json]
{ "name": "symlinked-react-helpers", "version": "1.0.0", "types": "index.d.ts" }

//// [index.d.ts]
import type { ComponentProps, ComponentType } from "react";

export type StoryLike<T> =
  T extends ComponentType<any>
    ? { args?: Partial<ComponentProps<T>> }
    : { args?: T };

//// [package.json]
{ "name": "@types/react", "version": "1.0.0", "types": "index.d.ts" }

//// [index.d.ts]
declare module "react" {
  export type ReactNode = {};
  export type ComponentType<P = {}> = (props: P) => ReactNode;
  export type ComponentProps<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;
}


//// [repro.ts]
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


//// [repro.js]
export const CustomLabel = {
    args: {
        metric: 50,
        label: ({ id, children }) => children,
    },
};
