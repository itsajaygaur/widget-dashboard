import { Input } from "@/components/ui/input";
import useDashboardStore from "@/hooks/use-data";
import { useSearchParams } from "react-router-dom" 

export default function Navbar() {

    const { searchWidgets } = useDashboardStore()

    const [searchParams, setSearchParams] = useSearchParams();


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        const query = e.target.value;
        searchWidgets(query);
        if (query) {
            setSearchParams({ search: query });
        } else {
            setSearchParams({});
        }
      };


  return (
    <div className="flex gap-3 items-center justify-between px-4 py-3 bg-white shadow-sm">
        <a href="/" >
            <h1 className="font-semibold" >Dashboard</h1>
        </a>
        <div>
            <Input size={45} defaultValue={searchParams.get('search')?.toString()} onChange={handleSearch} placeholder="Search widgets" />
        </div>
    </div>
  )

}