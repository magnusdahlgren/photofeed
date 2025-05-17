interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message = "An error occurred.",
}: Readonly<ErrorMessageProps>) {
  return (
    <div className="error" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}
