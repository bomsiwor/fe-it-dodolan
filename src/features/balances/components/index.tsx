import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { TopUsers } from "./top-users";

export const Balances = () => {
    return (
        <main className="p-6">
            <Helmet>
                <title>KAS ss</title>
            </Helmet>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-slate-300">
                    Total kas
                </h2>
                <h1 className="text-4xl font-semibold">Rp. 5.000.000</h1>

                <Badge variant={"destructive-translucent"}>
                    Paylater : Rp. 1.000.000
                </Badge>
            </section>

            <section>
                <TopUsers />
            </section>
        </main>
    );
};
