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
      <Preview>Reset your password — link expires in 30 minutes</Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Top accent bar */}
          <div style={accentBar} />

          {/* Logo / wordmark area */}
          <Section style={logoSection}>
            <div style={logoMark}>✦</div>
            <span style={logoText}>DTracker</span>
          </Section>

          {/* Main content */}
          <Section style={main}>
            <Heading style={heading}>Forgot your password?</Heading>
            <Text style={subtext}>
              No worries — it happens. Click the button below and we'll get you
              back in within seconds.
            </Text>

            <Section style={buttonWrapper}>
              <Button href={resetUrl} style={button}>
                Reset my password
              </Button>
            </Section>

            <Text style={expiry}>
              ⏱ This link expires in <strong>30 minutes</strong>.
            </Text>

            <Hr style={hr} />

            {/* Fallback link */}
            <Text style={fallbackLabel}>
              Button not working? Copy this link:
            </Text>
            <div style={linkBox}>
              <Link href={resetUrl} style={linkInBox}>
                {resetUrl}
              </Link>
            </div>
          </Section>

          {/* Divider before footer */}
          <div style={footerDivider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Didn't request this?{" "}
              <span style={footerStrong}>You can safely ignore this email</span>{" "}
              — your password won't change unless you click the link above.
            </Text>
            <Text style={footerMeta}>
              © {new Date().getFullYear()} DTracker · Sent to you because you
              requested a password reset.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f0ece4",
  fontFamily: "Outfit, 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: "48px 16px",
};

const container: React.CSSProperties = {
  backgroundColor: "#faf8f4",
  borderRadius: "20px",
  boxShadow: "0 2px 12px rgba(90, 60, 20, 0.08)",
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
};

const accentBar: React.CSSProperties = {
  background: "linear-gradient(90deg, #c47a35 0%, #d4913f 100%)",
  height: "5px",
};

const logoSection: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  padding: "28px 36px 0",
};

const logoMark: React.CSSProperties = {
  color: "#c47a35",
  display: "inline",
  fontSize: "18px",
  marginRight: "8px",
};

const logoText: React.CSSProperties = {
  color: "#5a4e3a",
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "-0.3px",
};

const main: React.CSSProperties = {
  padding: "24px 36px 32px",
};

const heading: React.CSSProperties = {
  color: "#3d3326",
  fontSize: "24px",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  lineHeight: "1.2",
  margin: "0 0 12px",
};

const subtext: React.CSSProperties = {
  color: "#6b5f4e",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 28px",
};

const buttonWrapper: React.CSSProperties = {
  margin: "0 0 20px",
  textAlign: "left",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #c47a35 0%, #b86e2a 100%)",
  borderRadius: "12px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "15px",
  fontWeight: 600,
  letterSpacing: "0.1px",
  padding: "14px 28px",
  textDecoration: "none",
};

const expiry: React.CSSProperties = {
  backgroundColor: "#f5efe4",
  border: "1px solid #e8dece",
  borderRadius: "8px",
  color: "#8c7055",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 28px",
  padding: "10px 14px",
};

const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4dfd6",
  margin: "0 0 20px",
};

const fallbackLabel: React.CSSProperties = {
  color: "#9c8f7e",
  fontSize: "12px",
  margin: "0 0 8px",
};

const linkBox: React.CSSProperties = {
  backgroundColor: "#f0ece4",
  borderRadius: "8px",
  padding: "10px 14px",
  wordBreak: "break-all",
};

const linkInBox: React.CSSProperties = {
  color: "#b86e2a",
  fontSize: "12px",
  textDecoration: "underline",
};

const footerDivider: React.CSSProperties = {
  borderTop: "1px solid #e4dfd6",
};

const footer: React.CSSProperties = {
  backgroundColor: "#f4f0e8",
  padding: "20px 36px 28px",
};

const footerText: React.CSSProperties = {
  color: "#9c8f7e",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const footerStrong: React.CSSProperties = {
  color: "#7a6e5e",
  fontWeight: 600,
};

const footerMeta: React.CSSProperties = {
  color: "#b8ae9e",
  fontSize: "11px",
  margin: 0,
};
