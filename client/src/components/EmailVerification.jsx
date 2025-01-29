const BASE_URL = import.meta.env.VITE_API_URL;

const EmailVerification = () => {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get ID and token from URL
        const pathSegments = window.location.pathname.split("/");
        const id = pathSegments[pathSegments.length - 2];
        const token = pathSegments[pathSegments.length - 1];

        // Send verification request
        const response = await fetch(
          `${BASE_URL}/auth/verify-email/${id}/${token}`
        );
        const data = await response.json();

        // Display the response message
        setMessage(data.message);
      } catch (error) {
        setMessage("An error occurred");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="p-4">
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;
