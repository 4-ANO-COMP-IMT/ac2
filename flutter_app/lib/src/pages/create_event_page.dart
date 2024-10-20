import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CreateEventPage extends StatefulWidget {
  const CreateEventPage({super.key});

  @override
  State<CreateEventPage> createState() => _CreateEventPageState();
}

class _CreateEventPageState extends State<CreateEventPage> {
  TimeOfDay _startTime = const TimeOfDay(hour: 8, minute: 0);
  TimeOfDay _endTime = const TimeOfDay(hour: 18, minute: 0);
  final List<DateTime> _selectedDates = [];
  final DateTime _today = DateTime.now();

  TextEditingController eventNameController = TextEditingController();
  TextEditingController eventDescriptionController = TextEditingController();

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (selectedDay.isAfter(_today.subtract(const Duration(days: 1)))) {
      setState(() {
        // Limita a seleção a 7 datas
        if (_selectedDates.contains(selectedDay)) {
          _selectedDates
              .remove(selectedDay); // Deselecionar se já estiver selecionada
        } else if (_selectedDates.length < 7) {
          _selectedDates.add(selectedDay); // Selecionar nova data
        }
      });
    }
  }

  Future<void> _selectTime(BuildContext context, bool isStart) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: isStart ? _startTime : _endTime,
    );
    if (picked != null) {
      setState(() {
        if (isStart) {
          _startTime = picked;
        } else {
          _endTime = picked;
        }
      });
    }
  }

  void _showAlert(BuildContext context, String title, String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Fecha o alerta
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void createEvent({
    required String name,
    required String description,
    required int startTime,
    required int endTime,
    required List<int> dates,
    required BuildContext context, // Passar o contexto para exibir o alerta
  }) async {
    final url = Uri.https('api.boramarcar.app.br', '/event/');

    final body = jsonEncode({
      'name': name,
      'description': description,
      'notEarlier': startTime,
      'notLater': endTime,
      'dates': dates,
    });

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      );

      if (response.statusCode == 201) {
        final decodedJson = json.decode(response.body);
        print(decodedJson);
        _showAlert(context, 'Sucesso',
            'Evento criado com sucesso! ID: ${decodedJson['data']['id']}');
      } else {
        _showAlert(context, 'Erro',
            'Erro ao criar o evento: ${response.statusCode}\n${response.body}');
      }
    } catch (e) {
      _showAlert(context, 'Erro', 'Ocorreu um erro: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            Navigator.pushNamed(context, '/');
          },
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 24),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.black,
                backgroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 16),
              ),
              onPressed: () {
                Navigator.pushNamed(context, '/create-event');
              },
              child: const Text('Criar evento'),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.light_mode),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.code),
            onPressed: () {},
          ),
        ],
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Container(
              width: 500,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.grey,
                    blurRadius: 8,
                    spreadRadius: 1,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Criar evento',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Crie seu evento em um clique.',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 24),
                  TextFormField(
                    controller: eventNameController,
                    decoration: const InputDecoration(
                      labelText: 'Nome do evento',
                      hintText: 'Ex: Daily do projeto',
                    ),
                    validator: (String? value) {
                      if (value == null || value.isEmpty || value.length < 3) {
                        return 'Por favor, digite o nome do evento.';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: eventDescriptionController,
                    decoration: const InputDecoration(
                      labelText: 'Descrição do evento (opcional)',
                      hintText: 'Ex: Reunião de alinhamento diário do projeto',
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text('Qual será o horário de trabalho?'),
                  Row(
                    children: [
                      Expanded(
                        child: InkWell(
                          onTap: () => _selectTime(context, true),
                          child: InputDecorator(
                            decoration: const InputDecoration(
                              labelText: 'Início',
                            ),
                            child: Text(_startTime.format(context)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: InkWell(
                          onTap: () => _selectTime(context, false),
                          child: InputDecorator(
                            decoration: const InputDecoration(
                              labelText: 'Fim',
                            ),
                            child: Text(_endTime.format(context)),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  const Text('Datas'),
                  TableCalendar(
                    firstDay: _today,
                    lastDay: DateTime(
                      _today.year + 1,
                      12,
                      31,
                    ),
                    focusedDay: _today,
                    calendarFormat: CalendarFormat.month,
                    startingDayOfWeek: StartingDayOfWeek.monday,
                    selectedDayPredicate: (day) {
                      // Define se o dia está selecionado
                      return _selectedDates.contains(day);
                    },
                    onDaySelected: _onDaySelected,
                    calendarStyle: const CalendarStyle(
                      isTodayHighlighted: true,
                      selectedDecoration: BoxDecoration(
                        color: Colors.blue,
                        shape: BoxShape.circle,
                      ),
                      todayDecoration: BoxDecoration(
                        color: Colors.orange,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Center(
                    child: ElevatedButton(
                      onPressed: () {
                        print(eventNameController.text);
                        print(eventDescriptionController.text);
                        print(_startTime.hour);
                        print(_endTime.hour);
                        print(_selectedDates);
                        print(
                          _selectedDates
                              .map((date) => date.millisecondsSinceEpoch)
                              .toList(),
                        );

                        createEvent(
                          name: eventNameController.text,
                          description: eventDescriptionController.text,
                          startTime: _startTime.hour * 3600000,
                          endTime: _endTime.hour * 3600000,
                          dates: _selectedDates
                              .map((date) => date.millisecondsSinceEpoch)
                              .toList(),
                          context: context,
                        );
                      },
                      child: const Text('Criar evento'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
