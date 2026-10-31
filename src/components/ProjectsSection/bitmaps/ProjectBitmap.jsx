/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          PROJECT BITMAP                                 │
│                                                                         │
│  Smart Dispatcher component for Project Card bitmap animations.         │
│  Routes each project ID to its custom procedural demoscene canvas.      │
└─────────────────────────────────────────────────────────────────────────┘
*/

import OverwatcherEye from "./OverwatcherEye";

export default function ProjectBitmap({ projectId, accent, isHovered }) {
  switch (projectId) {
    case "overwatcher":
      return <OverwatcherEye isHovered={isHovered} />;

    // Upcoming project cards will plug in here:
    // case "ticket-tamer":
    //   return <TicketTamerCanvas isHovered={isHovered} />;
    // case "collaborator":
    //   return <CollaboratorCanvas isHovered={isHovered} />;
    // case "rayib":
    //   return <RayibCanvas isHovered={isHovered} />;
    // case "catalogue":
    //   return <CatalogueCanvas isHovered={isHovered} />;

    default:
      return null;
  }
}
