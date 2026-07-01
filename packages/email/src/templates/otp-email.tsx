// oxlint-disable no-use-before-define
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Preview,
  Section,
} from "react-email";

import type { OtpPurpose } from "../send-mail";

type Props = {
  otp: string;
  purpose: OtpPurpose;
};

const purposeCopy: Record<
  Props["purpose"],
  { heading: string; preview: string; subtext: string }
> = {
  "email-verification": {
    heading: "Verify your email",
    preview: "Your verification code — expires in 5 minutes",
    subtext: "Use the code below to verify your email address.",
  },
  "forget-password": {
    heading: "Reset your password",
    preview: "Your password reset code — expires in 5 minutes",
    subtext:
      "Use the code below to reset your password. If you didn't request this, you can safely ignore this email.",
  },
  "sign-in": {
    heading: "Sign in to DTracker",
    preview: "Your sign-in code — expires in 5 minutes",
    subtext: "Use the code below to sign in to your account.",
  },
};

export default function OtpEmail({ otp, purpose }: Props) {
  const copy = purposeCopy[purpose];

  return (
    <Html>
      <Head />
      <Preview>{copy.preview}</Preview>

      <Body style={body}>
        <Container style={container}>
          <div style={accentBar} />

          <Section style={logoSection}>
            <div style={logoMark}>✦</div>
            <span style={logoText}>DTracker</span>
          </Section>

          <Section style={main}>
            <Heading style={heading}>{copy.heading}</Heading>
            <Text style={subtext}>{copy.subtext}</Text>

            <div style={otpBox}>
              <Text style={otpCode}>{otp}</Text>
            </div>

            <Text style={expiry}>
              This code expires in <strong>5 minutes</strong>.
            </Text>

            <Hr style={hr} />

            <Text style={footerNote}>
              Didn't request this? You can safely ignore this email.
            </Text>
          </Section>

          <div style={footerDivider} />

          <Section style={footer}>
            <Text style={footerMeta}>
              © {new Date().getFullYear()} DTracker
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

const otpBox: React.CSSProperties = {
  backgroundColor: "#f5efe4",
  border: "1px solid #e8dece",
  borderRadius: "12px",
  margin: "0 0 20px",
  padding: "20px",
  textAlign: "center",
};

const otpCode: React.CSSProperties = {
  color: "#3d3326",
  fontFamily: "monospace",
  fontSize: "36px",
  fontWeight: 700,
  letterSpacing: "8px",
  margin: 0,
};

const expiry: React.CSSProperties = {
  color: "#8c7055",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 28px",
};

const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4dfd6",
  margin: "0 0 20px",
};

const footerNote: React.CSSProperties = {
  color: "#9c8f7e",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: 0,
};

const footerDivider: React.CSSProperties = {
  borderTop: "1px solid #e4dfd6",
};

const footer: React.CSSProperties = {
  backgroundColor: "#f4f0e8",
  padding: "20px 36px 28px",
};

const footerMeta: React.CSSProperties = {
  color: "#b8ae9e",
  fontSize: "11px",
  margin: 0,
};
