import React from "react";

// import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <footer className="footer is-dark">
      <div className="content has-text-centered">
        &copy; -{" "}
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pietro Labadessa
        </a>
        {""}
      </div>
    </footer>
  );
};

export default Footer;
