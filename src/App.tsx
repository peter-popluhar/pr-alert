import { Alert } from "./components/Alert";

function App() {
  return (
    <main>
      <Alert
        heading='Alert heading'
        copy="Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
        cta={{
          ctaCopy: "View more",
          ctaAction: () => console.log("CTA clicked"),
        }}
        onAlertClose={() => console.log("Alert closed")}
      />
    </main>
  );
}

export default App
