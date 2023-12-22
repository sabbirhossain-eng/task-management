import { useForm } from "react-hook-form";
import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

const TaskUpdate = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { _id,title, priority, description, deadline} = useLoaderData();

    const handleFormSubmit = async (data) => {
        const taskUpdate = {
            title: data.title,
            priority: data.priority,
            description: data.description,
            deadline: data.deadline
        }
    
        const task = await axiosSecure.patch(`tasks/update/${_id}`, taskUpdate)
        
        if(task.data.modifiedCount > 0){
            reset();
            toast.success('Update Successfully');
        }
      };
    
    return (
        <div>
            <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Create a New Task
        </Typography>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-8 mb-2 w-[70%] mx-auto"
        >
          <div className="mb-1 space-y-6">
            {/* row1 */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="flex-1">
                <Input
                defaultValue={title}
                  label="Title"
                  size="lg"
                  placeholder="Task Name"
                  {...register("title", { required: true })}
                />
              </div>
            </div>
            {/* row12 */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="flex-1">
                <select {...register("priority")} className="w-full py-3 border border-gray-400 rounded-md" defaultValue={priority}>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex-1">
                <Input
                defaultValue={deadline}
                  label="Deadline"
                  size="lg"
                  type="date"
                  {...register("deadline")}
                />
              </div>
            </div>
            <div>
                <Textarea
                defaultValue={description}
                  label="Description"
                  size="lg"
                  {...register('description')}
                />
              </div>
          </div>
          <Button color="blue" className="mt-6" type="submit" fullWidth>
            Add Task
          </Button>
        </form>
      </Card>
        </div>
    );
};

export default TaskUpdate;