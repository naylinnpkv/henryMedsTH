import Link from "next/link";

const BackToHome = () => {
  return (
    <Link href="/">
      <button style={{ backgroundColor: "blue", margin: "10px" }}>
        Back to Home
      </button>
    </Link>
  );
};

export default BackToHome;
