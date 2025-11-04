"use client";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/admin/admin-login-form";
import { UserInfo } from "@/types/user";


export default function AdminLoginPage() {

	const router = useRouter()

	const onLoginSuccess = (user: UserInfo) => {
		localStorage.setItem("user", JSON.stringify(user));
		router.push("/admin/categories");
	}

	return (
		<div className="bg-muted flex min-h-full basis-full flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm onLoginSuccess={onLoginSuccess} />
			</div>
		</div>
	);
}
