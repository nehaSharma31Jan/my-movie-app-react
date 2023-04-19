import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { bookTicket } from '../../api';
import '../../css/allPagesStyle.css'

const BookTicket: React.FC = () => {
  const [ticket, setTicket] = useState({
    movieId: '',
    showtime: '',
    numberOfTickets: '',
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await bookTicket(ticket.movieId, user!.token);
      console.log(result);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
    <Container className="my-5">
      <h2>Book a Ticket</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label for="movieId">Movie ID</Form.Label>
          <FormControl
            type="text"
            name="movieId"
            id="movieId"
            value={ticket.movieId}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label for="showtime">Showtime</Form.Label>
          <FormControl
            type="text"
            name="showtime"
            id="showtime"
            value={ticket.showtime}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label for="numberOfTickets">Number of Tickets</Form.Label>
          <FormControl
            type="text"
            name="numberOfTickets"
            id="numberOfTickets"
            value={ticket.numberOfTickets}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
    </div>
    </div>
  );
};

export default BookTicket;
