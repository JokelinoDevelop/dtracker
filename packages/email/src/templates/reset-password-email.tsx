// oxlint-disable no-use-before-define
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Preview,
  Section,
  Link,
} from "react-email";

type Props = {
  resetUrl: string;
};

export default function ResetPasswordEmail({ resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Top accent bar */}
          <div style={accentBar} />

          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>Reset your password</Heading>
            <Text style={subheading}>
              We received a request to reset your password.
            </Text>
          </Section>

          {/* Card */}
          <Section style={card}>
            <Text style={text}>
              Click the button below to securely reset your password.
            </Text>

            <Text style={textMuted}>
              This link will expire soon for your security.
            </Text>

            <Section style={buttonWrapper}>
              <Button href={resetUrl} style={button}>
                Reset Password
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={smallText}>
              If the button doesn’t work, use this link:
            </Text>

            <Link href={resetUrl} style={link}>
              {resetUrl}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              If you didn’t request this, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f6f7fb",
  fontFamily: "Outfit, Arial, sans-serif",
  padding: "40px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const accentBar: React.CSSProperties = {
  backgroundColor: "#4f46e5",
  height: "6px",
};

const header: React.CSSProperties = {
  padding: "28px 32px 10px",
};

const heading: React.CSSProperties = {
  color: "#111827",
  fontSize: "22px",
  fontWeight: 700,
  margin: 0,
};

const subheading: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "6px",
};

const card: React.CSSProperties = {
  padding: "24px 32px",
};

const text: React.CSSProperties = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "22px",
};

const textMuted: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  marginTop: "8px",
};

const buttonWrapper: React.CSSProperties = {
  margin: "28px 0",
  textAlign: "center",
};

const button: React.CSSProperties = {
  backgroundColor: "#4f46e5",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "12px 20px",
  textDecoration: "none",
};

const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "24px 0",
};

const smallText: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
};

const link: React.CSSProperties = {
  color: "#4f46e5",
  fontSize: "12px",
  wordBreak: "break-all",
};

const footer: React.CSSProperties = {
  backgroundColor: "#fafafa",
  padding: "20px 32px 28px",
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
};
