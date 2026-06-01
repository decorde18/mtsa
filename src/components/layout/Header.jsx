"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useCallback } from "react";
// import { useDataContext } from "@/contexts/DataContext";

function Header() {
  const router = useRouter();
  // const { activeSeasons, currentSeason, setCurrentSeason } = useDataContext();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Check authentication status
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (err) {
        console.error("Error fetching auth status:", err);
        setIsLoggedIn(false);
      }
    };

    fetchAuthStatus();
  }, [setIsLoggedIn]);

  const handleSeasonChange = useCallback(
    (e) => {
      const selectedSeasonId = parseInt(e.target.value, 10);
      const selectedSeason = activeSeasons.find(
        (season) => season.id === selectedSeasonId
      );

      if (selectedSeason) {
        setCurrentSeason(selectedSeason);
      }
    },
    [activeSeasons, setCurrentSeason]
  );

  const handleLogout = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        localStorage.removeItem("token");
        await fetch("/api/logout", { method: "GET" });
        setIsLoggedIn(false);
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
        // Still redirect even if logout request fails
        setIsLoggedIn(false);
        router.push("/login");
      }
    },
    [setIsLoggedIn, router]
  );

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleAdminClick = useCallback(() => {
    router.push("/admin/adminDashboard");
  }, [router]);

  // Don't render season selector if no active seasons or current season
  const shouldShowSeasonSelector = activeSeasons.length > 0 && currentSeason;

  return (
    <header className="flex justify-between items-center p-[var(--padding-md)] shadow-[0px_4px_8px_var(--shadow)] text-center bg-[var(--color-primary)] text-[var(--color-white)] print:hidden max-md:flex-col max-md:p-[var(--padding-sm)]">
      <div onClick={handleLogoClick} className="flex items-center cursor-pointer mb-[var(--padding-sm)] w-[30%] max-md:w-full max-md:justify-center max-md:mb-[var(--padding-sm)]">
        <img className="h-auto w-[var(--logo-width)] mr-[var(--padding-sm)] max-md:w-[var(--logo-width-small)]" src='/images/logo.png' alt='MTSA Logo' />
        <h1 className="font-bold text-[2.5rem] m-0 max-md:text-[1.5rem]">Middle Tennessee Soccer Alliance</h1>
      </div>

      <div className="flex justify-center items-center gap-[var(--padding-sm)] w-[40%] max-md:flex-col max-md:w-full max-md:gap-[var(--padding-sm)]">
        {shouldShowSeasonSelector && (
          <select
            name='season'
            onChange={handleSeasonChange}
            value={currentSeason.id}
            aria-label='Select season'
            className="grow max-w-[400px] m-0 p-[var(--padding-sm)] rounded-[var(--radius-default)] border-2 border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-primary)] cursor-pointer focus:outline-none focus:border-[var(--color-secondary)] max-md:w-[90%] max-md:max-w-[300px]"
          >
            {activeSeasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.mtsa_name}
              </option>
            ))}
          </select>
        )}
      </div>

      <nav className="w-[30%]">
        <ul className="list-none p-0 m-0 flex justify-end">
          <li className="m-0">
            {isLoggedIn ? (
              <div className="flex gap-[var(--padding-md)]">
                <button
                  onClick={handleAdminClick}
                  aria-label='Go to admin dashboard'
                  className="p-[var(--padding-md)] bg-[var(--color-white)] text-[var(--color-primary)] border-none rounded-[var(--radius-default)] cursor-pointer transition-all duration-200 ease-in-out text-[1.5rem] font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-white)] hover:-translate-y-0.5 active:translate-y-0 max-md:hidden"
                >
                  Admin
                </button>
                <button 
                  onClick={handleLogout} 
                  aria-label='Logout'
                  className="p-[var(--padding-md)] bg-[var(--color-white)] text-[var(--color-primary)] border-none rounded-[var(--radius-default)] cursor-pointer transition-all duration-200 ease-in-out text-[1.5rem] font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-white)] hover:-translate-y-0.5 active:translate-y-0 max-md:hidden"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href='/login'>
                <button 
                  aria-label='Admin login'
                  className="p-[var(--padding-md)] bg-[var(--color-white)] text-[var(--color-primary)] border-none rounded-[var(--radius-default)] cursor-pointer transition-all duration-200 ease-in-out text-[1.5rem] font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-white)] hover:-translate-y-0.5 active:translate-y-0 max-md:hidden"
                >
                  Admin Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
