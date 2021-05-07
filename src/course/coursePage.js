import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "black",
    paddingTop: 10,
  },
  date: {
    color: "lightgrey",
  },
  description: {
    color: "black",
    paddingTop: 10,
  },
  button: {
    margin: 10,
    fontWeight: "bolder",
  },
  box: {
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  link: {
    color: "black",
    padding: 10,
  },
  list: {
    display: "inline-block",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const APIPath = "/Courses";

export default function CoursePage() {
  let { subject, courseId } = useParams();

  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [semesterSelected, setSemesterSelected] = useState("");
  const [sectionSelected, setSectionSelected] = useState("");

  const query = `/${subject.toUpperCase()}/${courseId}`;
  console.log(query);
  const ref = React.createRef;
  const handleChangeSemester = async (event) => {
    await fetch(
      process.env.REACT_APP_API_BASEURL +
        APIPath +
        query +
        `/${event.target.value}`
    )
      .then((resp) => resp.json())
      .then((data) => setSemester(data))
      .catch(() => {
        window.location.href = "/";
      });
    setSemesterSelected(event.target.value);
    setSectionSelected("");
  };
  const handleChangeSection = async (event) => {
    await fetch(
      process.env.REACT_APP_API_BASEURL +
        APIPath +
        query +
        `/${semesterSelected}/${event.target.value}`
    )
      .then((resp) => resp.json())
      .then((data) => setSection(data))
      .catch(() => {
        window.location.href = "/";
      });
    setSectionSelected(event.target.value);
  };

  const classes = useStyles();

  useEffect(async () => {
    await fetch(process.env.REACT_APP_API_BASEURL + APIPath + query)
      .then((resp) => resp.json())
      .then((data) => setCourse(data))
      .catch(() => {
        window.location.href = "/404";
      });
  }, []);

  function termCodeToTerm(termCode) {
    var term = "20" + termCode.substring(1, 3) + " ";
    switch (termCode[3]) {
      case "0":
        term = term + "SS";
        break;
      case "3":
        term = term + "S1";
        break;
      case "5":
        term = term + "S2";
    }
    return term;
  }

  return (
    <div ref={ref}>
      <CircularProgress
        style={{ display: course ? "none" : "block", margin: "20px auto" }}
      />
      <Box className={classes.box} m={1} p={1}>
        <Box p={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Typography variant="h3" gutterBottom className={classes.title}>
              {course
                ? course.subject + " " + course.catalogNbr + ": " + course.title
                : ""}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="simple-select-outlined-label" ref={ref}>
                Semester
              </InputLabel>
              <Select
                ref={ref}
                labelId="simple-select-outlined-label"
                id="simple-select-outlined"
                value={semesterSelected}
                onChange={handleChangeSemester}
                label="Semester"
              >
                {course.terms?.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {termCodeToTerm(item)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.description}
          >
            {course ? course.description : ""}
          </Typography>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Requirements: {course.rqrmntDescr}
          </Typography>
          {/*<Typography variant="subtitle1" gutterBottom*/}
          {/*            className={classes.title}>{course.rqrmntDescr}</Typography>*/}
          <Button
            disabled={!course}
            variant="contained"
            href={`https://courseoutline.auckland.ac.nz/dco/course/${course.subject}/${course.catalogNbr}/${semesterSelected}`}
            className={classes.button}
          >
            syllabus
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        className={classes.box}
        justifyContent="flex-start"
        m={1}
        p={1}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h4" gutterBottom className={classes.title}>
            Classes:{" "}
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="simple-select-outlined-label" ref={ref}>
              Section
            </InputLabel>
            <Select
              ref={ref}
              labelId="simple-select-outlined-label"
              id="simple-select-outlined"
              value={sectionSelected}
              onChange={handleChangeSection}
              label="Section"
            >
              {semester.sections?.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Box>
      {section ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section.meetingPatterns.map((meetingPattern) => (
                <TableRow key={meetingPattern.meetingNumber}>
                  <TableCell component="th" scope="row">
                    {meetingPattern.startDate + " -- " + meetingPattern.endDate}
                  </TableCell>
                  <TableCell align="right">
                    {meetingPattern.daysOfWeek +
                      "  " +
                      meetingPattern.startTime.substring(0, 5) +
                      " -- " +
                      meetingPattern.endTime.substring(0, 5)}
                  </TableCell>
                  <TableCell align="right">{meetingPattern.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
}
