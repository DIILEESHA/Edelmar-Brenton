import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/logo.png";

const QRCodeComponent = () => {
  const qrRef = useRef(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    qrRef.current.toDataURL().then(url => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "wedding-qr-code.png";
      link.click();
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <QRCode
        value="https://edelmar-brenton.vercel.app/"
        size={300}
        logoImage={logo}
        logoWidth={110}
        logoHeight={110}
        logoBackgroundColor="#fff"
        removeQrCodeBehindLogo={true}
        ecLevel="H"
        getRef={ref => (qrRef.current = ref)}
      />

      <br /><br />

      <button onClick={downloadQR}>Download QR Code</button>
    </div>
  );
};

export default QRCodeComponent;