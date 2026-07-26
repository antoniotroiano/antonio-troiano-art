import {getBaseUrl} from "@/lib/api/baseUrl";
import {Portfolio, UpdatePortfolioDto} from "@/types/portfolio";

export async function fetchPortfolio(): Promise<Portfolio[]> {
    console.debug("Fetch portfolio");
    const res = await fetch(`${getBaseUrl()}/api/portfolio`, {
        next: {revalidate: 3600}
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch portfolio. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchSinglePortfolio(id: unknown): Promise<Portfolio> {
    console.debug("Fetch single portfolio with id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/admin/portfolio/${id}`, {
        next: {revalidate: 3600},
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch single portfolio. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function createPortfolio(createData: any) {
    console.info("Create new portfolio");
    const res = await fetch(`${getBaseUrl()}/api/admin/portfolio`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(createData),
    });

    if (!res.ok) throw new Error("Fehler beim Erstellen des Portfolios");

    return res.json();
};

export async function updatePortfolio(id: string, updatedData: UpdatePortfolioDto) {
    console.info("Update portfolio with id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update portfolio");

    return res.json();
}

export const deletePortfolio = async (id: number) => {
    console.info("Delete portfolio with id= " + id);
    const response = await fetch(`${getBaseUrl()}/api/admin/portfolio/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete portfolio: ${response.status} - ${errorText}`);
    }
};
