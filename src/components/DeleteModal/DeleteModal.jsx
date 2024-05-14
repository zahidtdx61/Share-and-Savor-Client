import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import useSession from "../../hooks/useSession";

const DeleteModal = ({ open, setOpen, foodId, setFetchData }) => {
  const session = useSession();

  const deleteFood = async (id) => {
    try {
      const res = await session.delete(`/delete-food/${id}`);
      console.log(res.data);
      setOpen(false);
      setFetchData((prev) => !prev);
      toast.success("Food deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete food");
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <IoWarningOutline />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to delete this food?
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => deleteFood(foodId)}
          >
            Delete
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  foodId: PropTypes.string.isRequired,
  setFetchData: PropTypes.func.isRequired,
};

export default DeleteModal;
