export { default } from "next-auth/middleware";


export const config = { matcher: [
    "/ambiente-logado/:path*", 
    "/api/calendar/:path*", 
    "/api/curriculum/:path*",
    "/api/dashboard/:path*",
    "/api/departament/:path*",
    "/api/subject/:path*",
    "/api/teacher/:path*",
    "/api/timetable/:path*",
    "/api/user/editUser",
    "/api/user/getUserData",
] };
