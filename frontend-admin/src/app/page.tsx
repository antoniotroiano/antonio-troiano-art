import Link from 'next/link';
import LogoutButton from "@/components/LogoutButton";

export default function AdminDashboard() {

    return (
        <div className="grid grid-cols-1 pt-20 justify-center items-center px-6 mx-auto w-full">
            <div className="text-6xl font-bold my-8">Admin Dashboard</div>
            <div className="flex">
                <Link href="/shop/"
                      className="mx-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Shop Dashboard
                </Link>
                <Link href="/portfolio/"
                      className="mx-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Portfolio Dashboard
                </Link>
                <Link href="/blog/"
                      className="mx-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Blog Dashboard
                </Link>
                <LogoutButton/>
            </div>
        </div>
    );
}
