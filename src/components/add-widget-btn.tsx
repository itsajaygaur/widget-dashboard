import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import useDashboardStore from "../hooks/use-data"
import { useState } from "react"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"
   

export default function AddWidgetBtn({categoryId}: {categoryId: number}) {

    const [isOpen, setIsOpen] = useState(false)

    const { addWidget } = useDashboardStore()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const name = formData.get('name') as string
      const description = formData.get('description') as string
      addWidget(categoryId, {name, description, id: Date.now(), visible: true})
      setIsOpen(false)
      toast.success("Widget added successfully")
    }

 return(
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button variant="outline"> <Plus className="mr-2" size={18} /> Add Widget</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[475px]">
      <DialogHeader>
        <DialogTitle>  Add Widget</DialogTitle>
        <DialogDescription>
          Make changes to your widget here. Click add when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6" >
        <div>
            <Label  >Name</Label>
            <Input name="name" className="mt-2" type="text" placeholder="Widget Name" required />
        </div>
        <div>
            <Label>Description</Label>
            <Textarea name="description" className="mt-2" placeholder="Widget Description" required />
        </div>

      <DialogFooter>
        <Button className="" type="submit"  >Add widget</Button>
      </DialogFooter>
    </form>
    </DialogContent>
  </Dialog>

 ) 
}