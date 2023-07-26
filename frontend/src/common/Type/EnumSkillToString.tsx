function EnumSkillToString(enumValue: string): string {
  const specialCases: { [key: string]: string } = {
    C_PLUS_PLUS: "C++",
    C_SHARP: "C#",
    ASP_NET: "ASP.NET",
    NODEJS: "NodeJs",
    EXPRESS_JS: "Express.js",
    SPRING_MVC: "Spring MVC",
    SPRING_SECURITY: "Spring Security",
    SPRING_CLOUD: "Spring Cloud",
    JSF: "JSF",
    JSP_SERVLETS: "JSP Servlets",
    NEXT_JS: "Next.js",
    D3_JS: "D3.js",
    SOCKET_IO: "Socket.io",
    TAILWIND_CSS: "Tailwind CSS",
    ORACLE_DB: "Oracle DB",
    INFLUXDB: "InfluxDB",
    GITLAB: "GitLab",
    TRAVIS_CI: "Travis CI",
    DOCKER_SWARM: "Docker Swarm",
    EVENT_DRIVEN_ARCHITECTURE: "Event-Driven Architecture",
    PROGRESSIVE_WEB_APPS: "Progressive Web Apps",
    USER_INTERFACE_DESIGN: "User Interface Design",
    USER_EXPERIENCE_DESIGN: "User Experience Design",
    F_SHARP: "F#",
    OBJECTIVE_C: "Objective C",
    JAVASCRIPT: "JavaScript",
  };

  if (specialCases[enumValue]) {
    return specialCases[enumValue];
  }

  return (
    enumValue.charAt(0) + enumValue.slice(1).toLowerCase().replace(/_+/g, " ")
  );
}

export default EnumSkillToString;
