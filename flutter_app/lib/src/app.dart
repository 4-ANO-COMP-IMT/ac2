import 'package:flutter/material.dart';
import 'package:flutter_app/src/pages/create_event_page.dart';
import 'package:flutter_app/src/pages/home_page.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (_) => const HomePage(),
        '/create-event': (_) => const CreateEventPage(),
      },
    );
  }
}
