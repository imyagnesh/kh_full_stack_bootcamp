import React, {
  createContext,
  FC,
  PropsWithChildren,
  PureComponent,
} from 'react';

type ThemeType = 'dark' | 'light';

type ThemeContextType = {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type Props = {};

type State = {
  theme: ThemeType;
};

export class ThemeProvider extends PureComponent<
  PropsWithChildren<Props>,
  State
> {
  constructor(props: PropsWithChildren<Props>) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }

  changeTheme = (theme: ThemeType) => {
    this.setState({
      theme,
    });
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, changeTheme: this.changeTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;
