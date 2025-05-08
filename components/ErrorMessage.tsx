interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: Readonly<ErrorMessageProps>) {
  return <div className="error">{message}</div>;
}
