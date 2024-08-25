import { ChartNoAxesColumn } from "lucide-react";

export default function CwppCharts() { 
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <ChartNoAxesColumn size={52} className="text-gray-400" />
            <p className="text-gray-800 text-xs" >No graph data available</p>
        </div>
    )
}