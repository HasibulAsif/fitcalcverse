import { Card } from "@/components/ui/card";

export const ProtocolsSection = () => {
  const protocols = [
    {
      name: "Harvard Medical School",
      logo: "/lovable-uploads/ef4cebd2-e446-4532-8ad9-30247c785ae2.png",
      alt: "Harvard Medical School Logo"
    },
    {
      name: "American College of Sports Medicine",
      logo: "/lovable-uploads/919cd2e2-de37-446a-bbf6-d32399c95a46.png",
      alt: "American College of Sports Medicine Logo"
    },
    {
      name: "Mayo Clinic",
      logo: "/lovable-uploads/54716562-2373-4f69-83e9-a4e72c759d15.png",
      alt: "Mayo Clinic Logo"
    },
    {
      name: "World Health Organization",
      logo: "/lovable-uploads/81bd2800-f5c6-4152-aa5e-5da786250df5.png",
      alt: "World Health Organization Logo"
    },
    {
      name: "USDA",
      logo: "/lovable-uploads/853cc61f-9c23-4385-9af4-234def4910cd.png",
      alt: "USDA Logo"
    }
  ];

  return (
    <div className="py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Followed Protocols, Standards & Guidelines
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our nutrition and fitness recommendations are based on established protocols from leading medical institutions
          </p>
        </div>

        <Card className="p-8 rounded-2xl bg-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className="flex items-center justify-center p-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src={protocol.logo}
                  alt={protocol.alt}
                  className="max-h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};