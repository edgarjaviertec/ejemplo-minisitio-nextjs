import MenuPrincipal from "@/components/menu_principal";

export default function DefaultLayout({children}){
	return <>
		<MenuPrincipal></MenuPrincipal>
		<div className="container py-3 py-lg-5">
			{children}
		</div>
	</>
}