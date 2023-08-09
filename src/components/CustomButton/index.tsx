import { CSSProperties } from "react";
import { Button } from "antd";
import "./index.css";

type Props = {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
  type?: any;
  icon?: JSX.Element | JSX.Element[];
  style?: CSSProperties;
  htmlType?: any;
  loading?: boolean;
  onClick?: any;
  size?: any;
};

function CustomButton({ children, className, style, ...props }: Props) {
  return (
    <Button className={`custom-button ${className}`} style={style} {...props}>
      {children}
    </Button>
  );
}

export default CustomButton;
