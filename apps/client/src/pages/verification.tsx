import { Link } from "react-router-dom";
import { VerificationForm } from "@/features/verificationForm";
export default function Verification() {
  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="w-80 sm:w-[450px] border rounded-xl p-2">
        <h2 className="text-center font-semibold text-xl">
          Verify Credentials
        </h2>
        <VerificationForm></VerificationForm>

        <div className="w-full flex items-center justify-center">
          <Link to="/issuance" className="text-xs">
            To issue new crendentials! <strong>Click Here!</strong>
          </Link>
        </div>
      </div>
    </section>
  );
}
