import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopUserDebt } from "./top-users-debt";
import { TopUserBuyer } from "./top-users-buyer";

export const TopUsers = () => {
    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">Top Pengguna</h1>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid h-[80px] w-full grid-cols-2">
                    <TabsTrigger value="buyer" className="h-full">
                        Pembeli
                    </TabsTrigger>
                    <TabsTrigger value="debitur" className="h-full">
                        Penghoetank
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buyer">
                    <TopUserBuyer />
                </TabsContent>
                <TabsContent value="debitur">
                    <TopUserDebt />
                </TabsContent>
            </Tabs>
        </>
    );
};
