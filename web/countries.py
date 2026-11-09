"""Featured countries are contextual labels, not nuclear transfer data."""
COUNTRIES = {
    "india": "India", "united_states": "United States", "russia": "Russia",
    "united_kingdom": "United Kingdom", "france": "France", "china": "China",
    "pakistan": "Pakistan", "israel": "Israel", "north_korea": "North Korea",
    "ukraine": "Ukraine",
}
NUCLEAR_STATES = [key for key in COUNTRIES if key != "ukraine"]
NUCLEAR_SOURCE = "https://www.sipri.org/media/press-release/2026/increasing-focus-nuclear-weapons-amid-heightened-escalation-risks-new-sipri-yearbook-out-now"
