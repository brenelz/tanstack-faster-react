import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="bg-white fixed top-0 z-10 flex h-[90px] w-[100vw] flex-grow items-center justify-between border-b-2 border-[#FFA366] bg-background p-2 pb-[4px] pt-2 sm:h-[70px] sm:flex-row sm:gap-4 sm:p-4 sm:pb-[4px] sm:pt-0">
      <div className="flex flex-grow flex-col">
        <div className="flex w-full flex-col items-start justify-center sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          <Link className="text-4xl font-bold text-[#FF6B00]" to="/">
            TanstackFaster
          </Link>
          <div className="items flex w-full flex-row items-center justify-between gap-4">
            <div className="mx-0 flex-grow sm:mx-auto sm:flex-grow-0">
              <div className="font-sans">
                <div className="relative flex-grow">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-x absolute right-7 top-2 h-5 w-5 text-muted-foreground hidden"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
