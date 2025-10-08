import { Link } from "react-router-dom";
import { IssuanceForm } from "@/features/issuanceForm";
export default function Issuance() {
  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="w-80 sm:w-[450px] border rounded-xl p-2">
        <h2 className="text-center font-semibold text-xl">
          Issue New Credentials
        </h2>
        <IssuanceForm></IssuanceForm>

        <div className="w-full flex items-center justify-center">
          <Link to="/verify" className="text-xs">
            To verify crendentials! <strong>Click Here!</strong>
          </Link>
        </div>
      </div>
    </section>
  );
}
