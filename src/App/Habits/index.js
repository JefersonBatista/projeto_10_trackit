import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AddSharp } from "react-ionicons";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar";
import Menu from "../../components/Menu";
import UserContext from "../../contexts/UserContext";
import HabitCreation from "./HabitCreation";
import Habit from "./Habit";

import { Button } from "../../styles/Button";

import { HabitsPage, HabitsTop, NoHabitsMessage } from "./style.js";

export default function Habits() {
  const {
    retrieveAndSetLogin,
    token,
    userImage,
    todayProgress,
    setTodayProgress,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [habits, setHabits] = useState(null);
  const [habitCreation, setHabitCreation] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDays, setNewHabitDays] = useState([]);
  const [habitCreationLoading, setHabitCreationLoading] = useState(false);

  const habitCreationControl = {
    getHabits,
    setHabitCreation,
    newHabitName,
    setNewHabitName,
    newHabitDays,
    setNewHabitDays,
    habitCreationLoading,
    setHabitCreationLoading,
  };

  function getHabits() {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const doneHabits = response.data.filter((habit) => habit.done).length;
        const todayHabits = response.data.length;
        const percentage =
          doneHabits === 0 ? 0.0 : (doneHabits / todayHabits) * 100;

        setTodayProgress(percentage);
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    // If user is not logged in, go to login page

    if (retrieveAndSetLogin()) {
      getHabits();
    } else {
      navigate("/");
    }
  }, [token]);

  if (habits === null) {
    return (
      <HabitsPage>
        <TopBar userImage={userImage} />

        <Menu todayProgress={todayProgress} />
      </HabitsPage>
    );
  }

  return (
    <HabitsPage>
      <TopBar userImage={userImage} />

      <HabitsTop>
        <h1>Meus hábitos</h1>
        <Button
          width="40px"
          height="35px"
          radius="5px"
          highlighted
          fontSize="27px"
          onClick={() => {
            setHabitCreation(true);
          }}
        >
          <AddSharp
            title="Criar hábito"
            width="20px"
            height="20px"
            color="white"
          ></AddSharp>
        </Button>
      </HabitsTop>

      {habitCreation && <HabitCreation {...habitCreationControl} />}

      {habits.length === 0 ? (
        <NoHabitsMessage>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </NoHabitsMessage>
      ) : (
        habits.map((habit) => (
          <Habit key={habit.id} habit={habit} getHabits={getHabits} />
        ))
      )}

      <Menu todayProgress={todayProgress} />
    </HabitsPage>
  );
}
