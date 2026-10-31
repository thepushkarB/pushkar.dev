/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          PROJECT BITMAP                                 │
│                                                                         │
│  Smart Dispatcher component for Project Card bitmap animations.         │
│  Routes each project ID to its custom procedural demoscene canvas.      │
└─────────────────────────────────────────────────────────────────────────┘
*/

import OverwatcherEye from "./OverwatcherEye";
import TicketTamerCanvas from "./TicketTamerCanvas";

export default function ProjectBitmap({ projectId, accent, isHovered }) {
  switch (projectId) {
    case "overwatcher":
      return <OverwatcherEye isHovered={isHovered} />;

    case "ticket-tamer":
      return <TicketTamerCanvas isHovered={isHovered} />;

    // Upcoming project cards:
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
