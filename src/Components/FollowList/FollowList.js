import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

function FollowList({ follow }) {

  return (
    <>
      <Link
        to={"/profile/" + follow._id}
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="body2"
          fontSize={18}
          color="primary"
        >
          {follow.firstName + " " + follow.lastName}
        </Typography>
      </Link>
    </>
  )
}

export default FollowList