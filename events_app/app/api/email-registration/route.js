import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

export async function POST(req) {
  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return NextResponse.json({ message: 'Events not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { eventId, email } = body;

    // Знаходимо поточний івент
    const currentEvent = allEvents.find(event => event.id === eventId);

    if (!currentEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Перевіряємо, чи вже є цей email
    if (currentEvent.emails_registered.includes(email)) {
      return NextResponse.json({ message: 'This email has already been registered' }, { status: 409 });
    }

    // Додаємо новий email до списку зареєстрованих
    const updatedEvent = {
      ...currentEvent,
      emails_registered: [...currentEvent.emails_registered, email],
    };

    // Оновлюємо масив подій
    const updatedAllEvents = allEvents.map(event =>
      event.id === eventId ? updatedEvent : event
    );

    // Записуємо оновлені дані назад у файл
    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: updatedAllEvents }));

    console.log(`Event ID: ${eventId}, Email: ${email}`);

    // Відповідь про успішну реєстрацію
    return NextResponse.json({ message: 'You have been registered successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to register', error: error.message }, { status: 500 });
  }
}