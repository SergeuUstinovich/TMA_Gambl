import style from "./LoaderButton.module.scss";

interface LoaderButtonProps {
  className: string;
}

export const LoaderButton = ({className}: LoaderButtonProps) => (
  <span className={`${className} ${style.loader}`}></span>
);
