import { Box, Flex, Heading, Text, Button, Input, VStack, HStack, IconButton } from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';

const Index = () => {
  const [pitches, setPitches] = useState([]);
  const [newPitch, setNewPitch] = useState('');

  const handleAddPitch = () => {
    if (newPitch) {
      setPitches([...pitches, { id: pitches.length + 1, content: newPitch }]);
      setNewPitch('');
    }
  };

  const handleDeletePitch = (id) => {
    setPitches(pitches.filter(pitch => pitch.id !== id));
  };

  const handleEditPitch = (id, content) => {
    const updatedPitches = pitches.map(pitch => {
      if (pitch.id === id) {
        return { ...pitch, content };
      }
      return pitch;
    });
    setPitches(updatedPitches);
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Event Pitch Manager</Heading>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="Add new event pitch"
            value={newPitch}
            onChange={(e) => setNewPitch(e.target.value)}
          />
          <Button onClick={handleAddPitch} leftIcon={<FaPlus />} colorScheme="blue">Add Pitch</Button>
        </HStack>
        {pitches.map(pitch => (
          <Flex key={pitch.id} align="center" justify="space-between" p={3} w="full" borderWidth="1px" borderRadius="lg">
            <Text>{pitch.content}</Text>
            <HStack>
              <IconButton
                icon={<FaEdit />}
                onClick={() => handleEditPitch(pitch.id, prompt('Edit pitch:', pitch.content))}
                aria-label="Edit pitch"
              />
              <IconButton
                icon={<FaTrashAlt />}
                onClick={() => handleDeletePitch(pitch.id)}
                aria-label="Delete pitch"
                colorScheme="red"
              />
            </HStack>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;