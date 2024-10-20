import 'package:flutter/material.dart';
import 'package:flutter_app/src/screens/home.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          leading: const Icon(Icons.menu),
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 24),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.black,
                  backgroundColor: Colors.white,
                  textStyle: const TextStyle(fontSize: 16),
                ),
                onPressed: () {},
                child: const Text('Criar evento'),
              ),
            ),
          ],
        ),
        body: const Home(),
      ),
    );
  }
}
