import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

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
      body: Container(
        margin: const EdgeInsets.all(24),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'BoraMarcar',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 56,
                ),
              ),
              const Text(
                'Simplificando seus encontos com praticidade e precisão.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 24),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/create-event');
                },
                style: TextButton.styleFrom(
                  foregroundColor: Colors.black,
                  backgroundColor: const Color.fromARGB(255, 238, 237, 237),
                  textStyle: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 12,
                  ),
                ),
                child: const Text('Criar evento'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
