import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
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
                print('Criar evento');
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
    );
  }
}
