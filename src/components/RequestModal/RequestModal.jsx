import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const RequestModal = ({ open, setOpen, food, mutateAsync }) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { email } = user;
  const { food_name, food_image, expiry_date, location, _id, donner } = food;

  const current_date = new Date().toLocaleDateString();
  const food_expiry_date = new Date(expiry_date).toLocaleDateString();

  const requestFood = async () => {
    try {
      await mutateAsync({ _id });
      reset();
      setOpen(false);
      toast.success("Food requested successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to request food");
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      // sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      className="flex justify-center p-4 w-full"
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "md",
          p: 3,
        }}
        className="overflow-scroll w-fit"
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Request your desired food
        </Typography>
        <div className="p-8 ">
          <form
            onSubmit={handleSubmit(() => requestFood())}
            className="space-y-5"
          >
            <div>
              <label className="font-medium">Food Name</label>
              <input
                required
                disabled
                defaultValue={food_name}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Food Image</label>
              <input
                required
                disabled
                defaultValue={food_image}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Food ID</label>
              <input
                required
                disabled
                defaultValue={_id}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Donner Name</label>
              <input
                defaultValue={donner.name}
                disabled
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Donner Email</label>
              <input
                defaultValue={donner.email}
                disabled
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Your Email</label>
              <input
                defaultValue={email}
                disabled
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Request Date</label>
              <input
                required
                disabled
                defaultValue={current_date}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Location</label>
              <input
                required
                disabled
                defaultValue={location}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Expiry Date</label>
              <input
                required
                disabled
                defaultValue={food_expiry_date}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Additional Notes</label>
              <input
                required
                {...register("notes")}
                placeholder="Enter any notes"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <input
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150 hover:cursor-pointer"
              value="Request This Food"
            />
          </form>
        </div>
      </Sheet>
    </Modal>
  );
};

RequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
  mutateAsync: PropTypes.func.isRequired,
};

export default RequestModal;
