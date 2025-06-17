'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Plane, Camera, Church, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DayItinerary from '@/components/day-itinerary';
import CountdownTimer from '@/components/countdown-timer';
import WeatherWidget from '@/components/weather-widget';
import ProgressTracker from '@/components/progress-tracker';
import EmergencyInfo from '@/components/emergency-info';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [activeDay, setActiveDay] = useState('day1');
  const { toast } = useToast();

  const tripStats = [
    { icon: Calendar, label: 'Días', value: '4', color: 'text-orange-500' },
    { icon: MapPin, label: 'Sitios', value: '25+', color: 'text-red-500' },
    { icon: Church, label: 'Basílicas', value: '8', color: 'text-purple-500' },
    { icon: Utensils, label: 'Restaurantes', value: '12', color: 'text-green-500' },
  ];

  const quickLinks = [
    { name: 'Museos Vaticanos', url: 'https://www.museivaticani.va', icon: Church },
    { name: 'Coliseo Tickets', url: 'https://ticketing.colosseo.it', icon: MapPin },
    { name: 'Google Maps Roma', url: 'https://maps.google.com/?q=Rome,Italy', icon: MapPin },
    { name: 'Tiempo Roma', url: 'https://weather.com/weather/today/l/Rome+Italy', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <div className="parallax-bg min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Aniversario en Roma
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              19 - 22 de Junio 2025
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Una guía interactiva para celebrar vuestro aniversario en la Ciudad Eterna
            </p>
            <CountdownTimer targetDate="2025-06-19" />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {tripStats.map((stat, index) => (
            <Card key={index} className="text-center rome-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Progress Tracker */}
        <ProgressTracker />

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="rome-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-orange-500" />
                Enlaces Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Day Itineraries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="rome-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Itinerario por Días
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="day1" className="text-xs md:text-sm">
                    Jue 19
                  </TabsTrigger>
                  <TabsTrigger value="day2" className="text-xs md:text-sm">
                    Vie 20
                  </TabsTrigger>
                  <TabsTrigger value="day3" className="text-xs md:text-sm">
                    Sáb 21
                  </TabsTrigger>
                  <TabsTrigger value="day4" className="text-xs md:text-sm">
                    Dom 22
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="day1">
                  <DayItinerary day="day1" />
                </TabsContent>
                <TabsContent value="day2">
                  <DayItinerary day="day2" />
                </TabsContent>
                <TabsContent value="day3">
                  <DayItinerary day="day3" />
                </TabsContent>
                <TabsContent value="day4">
                  <DayItinerary day="day4" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Info */}
        <EmergencyInfo />

        {/* Hotel Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="rome-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Hotel Ciao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Dirección:</p>
                  <p className="text-muted-foreground">Via Marsala 96, Termini, Roma</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://maps.google.com/?q=Via+Marsala+96+Roma', '_blank')}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver en Mapa
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('tel:+39064470000', '_blank')}
                    className="flex-1"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Llamar Hotel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}