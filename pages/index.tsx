import {
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Stack,
  Center,
  Checkbox,
  Text,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";

type Task = {
  text: string;
  isCompleted: boolean;
};

export default function Home() {
  const [maxTasks, setMaxTasks] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task && task.length < maxTasks) {
      setTasks([...tasks, { text: task, isCompleted: false }]);
      setTask("");
    }
    setTasks([...tasks, { text: task, isCompleted: false }]);
    setTask("");
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;

    if (newTasks[index].isCompleted) {
      setCompletedTasks([...completedTasks, newTasks[index]]);
    } else {
      setCompletedTasks(
        completedTasks.filter((t) => t.text !== newTasks[index].text)
      );
    }

    setTasks(newTasks);
  };

  return (
    <Center>
      <Stack pt={10}>
        <Heading mb={4}> What are your ToDos Today?</Heading>
        <HStack>
          <NumberInput
            itemType="number"
            maxW={30}
            value={maxTasks}
            onChange={(value) => setMaxTasks(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper fontSize={6} />
              <NumberDecrementStepper fontSize={6} />
            </NumberInputStepper>
          </NumberInput>
          <Input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            mb={4}
          />
          <Button onClick={addTask} mb={4}>
            Add Task
          </Button>
        </HStack>
        <Heading size="md" mb={4}>
          🤦‍♂️ ToDo
        </Heading>
        <List spacing={3}>
          {tasks.map((task, index) => (
            <>
              <ListItem key={index}>
                {task.isCompleted === false && (
                  <Checkbox
                    isChecked={task.isCompleted}
                    onChange={() => toggleTask(index)}
                  >
                    {task.text}
                  </Checkbox>
                )}
              </ListItem>
            </>
          ))}
        </List>
        <Heading size="md" mb={4}>
          🎉 TaDa
        </Heading>
        <List spacing={3}>
          {completedTasks.map((t, index) => (
            <ListItem key={index}>{t.text}</ListItem>
          ))}
        </List>
      </Stack>
    </Center>
  );
}
