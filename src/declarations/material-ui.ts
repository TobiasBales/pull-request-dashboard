declare module 'material-ui' {
  import * as React from 'react';

  type Color = 'inherit' | 'primary' | 'accent' | 'default';
  type ButtonColor = Color | 'contrast';
  type ChildComponent =
    | string
    | React.StatelessComponent<{}>
    | React.ComponentClass<{}>;

  interface AppBarProps {
    color?: Color;
    position?: 'static' | 'fixed' | 'absolute';
  }
  export class AppBar extends React.Component<AppBarProps, {}> {}

  interface AvatarProps {
    alt?: string;
    component?: ChildComponent;
    imgProps?: Object;
    sizes?: string;
    src?: string;
    srcSet?: string;
  }

  export class Avatar extends React.Component<AvatarProps, {}> {}

  interface ButtonProps {
    color?: ButtonColor;
    component?: ChildComponent;
    dense?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    disabled?: boolean;
    fab?: boolean;
    href?: string;
    raised?: boolean;
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  }
  export class Button extends React.Component<ButtonProps, {}> {}

  interface CardProps {
    raised?: boolean;
  }

  export class Card extends React.Component<CardProps, {}> {}

  interface CardHeaderProps {
    avatar?: JSX.Element;
    subheader?: JSX.Element | string;
    title?: JSX.Element | string;
  }

  export class CardHeader extends React.Component<CardHeaderProps, {}> {}

  interface CheckboxProps {
    // TODO: this is missing some props
    checked?: boolean;
    checkedClassName?: string;
    disableRipple?: boolean;
    disabled?: boolean;
    onChange?: (
      e: React.SyntheticEvent<HTMLInputElement>,
      checked: boolean
    ) => void;
  }

  export class Checkbox extends React.Component<CheckboxProps, {}> {}

  interface CircularProgressProps {
    color?: 'primary' | 'accent';
    max?: number;
    min?: number;
    mode?: 'determinate' | 'indeterminate';
    size?: number;
    value?: number;
  }

  export class CircularProgress extends React.Component<
    CircularProgressProps,
    {}
  > {}

  interface DialogProps {
    enterTransitionDuration?: number;
    fullscreen?: boolean;
    ignoreBackdropClick?: boolean;
    ignoreEscapeKeyUp?: boolean;
    leaveTransitionDuration?: number;
    maxWidth?: 'xs' | 'sm' | 'md';
    onBackdropClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
    onEnter?: () => void;
    onEntered?: () => void;
    onEntering?: () => void;
    onEscapeKeyUp?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    onExiting?: () => void;
    onRequestClose?: () => void;
    open?: boolean;
  }

  export class Dialog extends React.Component<DialogProps, {}> {}

  interface DialogActionsProps {}

  export class DialogActions extends React.Component<DialogActionsProps, {}> {}

  interface DialogContentProps {}

  export class DialogContent extends React.Component<DialogContentProps, {}> {}

  interface DialogContentTextProps {}

  export class DialogContentText extends React.Component<
    DialogContentTextProps,
    {}
  > {}

  interface DialogTitleProps {
    disableTypography?: boolean;
  }

  export class DialogTitle extends React.Component<DialogTitleProps, {}> {}

  interface ListProps {
    component?: ChildComponent;
    dense?: boolean;
    isablePadding?: boolean;
    rootRef?: (c: List) => void;
    subheader?: React.Component<{}, {}>;
  }

  export class List extends React.Component<ListProps, {}> {}

  interface ListItemProps {
    button?: boolean;
    component?: ChildComponent;
    dense?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
  }

  export class ListItem extends React.Component<ListItemProps, {}> {}

  interface ListItemAvatarProps {}

  export class ListItemAvatar extends React.Component<
    ListItemAvatarProps,
    {}
  > {}

  interface ListItemIconProps {}

  export class ListItemIcon extends React.Component<ListItemIconProps, {}> {}

  interface ListItemSecondaryActionProps {}

  export class ListItemSecondaryAction extends React.Component<
    ListItemSecondaryActionProps,
    {}
  > {}

  interface ListItemTextProps {
    disableTypography?: boolean;
    inset?: boolean;
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
  }

  export class ListItemText extends React.Component<ListItemTextProps, {}> {}

  interface ListItemSubheaderProps {
    color?: Color;
    inset?: boolean;
  }

  export class ListItemSubheader extends React.Component<
    ListItemSubheaderProps,
    {}
  > {}

  interface TextFieldProps {
    // TODO: incomplete
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    type?: 'text';
    onChange?: (s: React.SyntheticEvent<HTMLInputElement>) => void;
    inputProps?: Object;
  }

  export class TextField extends React.Component<TextFieldProps, {}> {}

  interface ToolbarProps {
    disableGutters?: boolean;
  }

  export class Toolbar extends React.Component<ToolbarProps, {}> {}
}
