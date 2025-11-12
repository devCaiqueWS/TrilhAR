import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { useCourses, useJobs } from '../../services/hooks';
import { CourseCard } from '../../components/CourseCard';

export const ExploreScreen: React.FC = () => {
  const { data: courses } = useCourses();
  const { data: jobs } = useJobs();
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Explorar" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text style={{ fontWeight: '700' }}>Cursos</Text>
        {courses?.map((c: any) => (
          <CourseCard key={c.id} title={c.title} provider={c.provider} hours={c.hours} badge={c.badge} />
        ))}
        <Text style={{ fontWeight: '700' }}>Vagas</Text>
        {jobs?.map((j: any) => (
          <View key={j.id} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12 }}>
            <Text style={{ fontWeight: '700' }}>{j.title}</Text>
            <Text style={{ color: '#6B7280' }}>{j.company}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

