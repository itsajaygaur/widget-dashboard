import useDashboardStore from "@/hooks/use-data";
import AddWidgetBtn from "@/components/add-widget-btn";
import DeleteWidgetBtn from "@/components/delete-widget-btn";
import ManageBtn from "@/components/manage-btn";
import { useSearchParams } from "react-router-dom";
import CspmCharts from "@/components/cspm-charts";
import RegistryScanCharts from "@/components/registryscan-charts";
import CwppCharts from "@/components/cwpp-charts";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";


export function Dashboard() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const { data, searchResults } = useDashboardStore();

  const finalData = searchQuery ? searchResults : data.categories;

  return (
    <div className="p-5 sm:p-7 md:p-10">
      <div className="flex items-center justify-between mb-5 gap-3">
        <h2>CNAPP Dashboard</h2>
        <div className="flex items-center gap-2">
        <ManageBtn />
        <Button variant="outline"  size="icon" >
            <RefreshCw size={18} />
        </Button>
        </div>
      </div>

      {finalData.length > 0 ? (
        finalData.map((category, index) => {
          return (
            <div key={index} className="mb-10">
              <h2 className="text-lg font-bold mb-2">{category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4">
                {category.name === "CSPM Executive" && !searchQuery && (
                  <div className="card-container">
                    <CspmCharts />
                  </div>
                )}
                {category.name === "Registry Scan" && !searchQuery && (
                  <div className="card-container">
                    <RegistryScanCharts />
                  </div>
                )}
                {category.name === "CWPP" && !searchQuery && (
                  <div className="card-container">
                    <CwppCharts />
                  </div>
                )}

                {category.widgets.map((widget, index) => {
                  return (
                    widget.visible && (
                      <div key={index} className="card-container relative">
                        {
                            !searchQuery &&
                            <DeleteWidgetBtn
                            widgetId={widget.id}
                            categoryId={category.id}
                            />
                        }
                        <h3 className="text-lg font-semibold  ">
                          {widget.name}
                        </h3>
                        <p className="text-gray-700">{widget.description}</p>
                      </div>
                    )
                  );
                })}
                {!searchQuery && (
                  <div className="card-container flex items-center justify-center">
                    <AddWidgetBtn categoryId={category.id} />
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg font-semibold">No widget found!</p>
      )}
    </div>
  );
}
